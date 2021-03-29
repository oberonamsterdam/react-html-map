import React, { createElement, FC, Fragment, ReactNode, useCallback } from 'react';
import htmlParser, { Options } from 'react-html-parser';
import { DomElement } from 'htmlparser2';

export interface Props extends Pick<Options, 'decodeEntities'> {
    children: TagMap;
    html: string;

    // don't ignore tags that are not in our map.
    acceptUnknown?: boolean;
}

export type TagMap = {
    [tag in keyof Partial<JSX.IntrinsicElements>]: FC<JSX.IntrinsicElements[tag]> | null;
};

const HtmlMapper = ({ children: tagMap, html, acceptUnknown, ...rest }: Props) => {
    const render = useCallback(
        <N extends keyof JSX.IntrinsicElements, A = JSX.IntrinsicElements[N]>(
            name: N,
            props: A,
            index: number,
            children: ReactNode
        ) => {
            if (!name) {
                return <Fragment key={index}>{children}</Fragment>;
            }

            // TODO: can't find out why the type assert is needed, it _should_ work as-is.
            const Renderer = tagMap[name] as FC<A & { index: number }> | null | undefined;

            const defaultRenderer = () => createElement(name, { ...props, children, key: index });

            // renderer was specified, but with null, meaning we can safely render this.
            if (Renderer === null) {
                return defaultRenderer();
            }

            // no renderer was specified
            if (typeof Renderer === 'undefined') {
                return acceptUnknown ? defaultRenderer() : null;
            }

            return (
                <Renderer {...props} index={index} key={index}>
                    {children}
                </Renderer>
            );
        },
        [acceptUnknown, tagMap]
    );

    const transform = useCallback(
        (node: DomElement, index: number) => {
            const name = node.name as keyof JSX.IntrinsicElements;
            let children: ReactNode = null;

            switch (node.type) {
                case 'text':
                    children = node.data;
                    break;
                case 'tag':
                    children = node.children?.map((childNode, i) => transform(childNode, i));
                    break;
                default:
                    break;
            }

            return render(name, node.attribs, index, children);
        },
        [render]
    );

    return (
        <>
            {htmlParser(html, {
                transform,
                ...rest,
            })}
        </>
    );
};

export default HtmlMapper;
