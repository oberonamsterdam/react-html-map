# `react-html-map`

Declarative, composable and secure HTML rendering for React.  

## Example
Provide your html, your 'tag mapping', and you're done!

```tsx
import HtmlMapper from 'react-html-map';

<HtmlMapper html={html}>
  {{
    p: Body,
    h1: (props) => <Title variant="large" {...props} />,
    h2: (props) => <Title variant="regular" {...props} />,
    h3: (props) => <Title variant="small" {...props} />,
    h4: (props) => <Title variant="micro" {...props} />,
    h5: (props) => <Title variant="tiny" {...props} />,
    a: ({ href, children, ...rest }) =>
      href?.startsWith("/") ? (
        // assume internal link
        <Link to={href}>{children}</Link>
      ) : (
        <a href={href} {...rest}>
          {children}
        </a>
      ),
  }}
</HtmlMapper>
```

This pattern can become quite powerful when reusing a tag mapping and overriding it as you deem fit, for example, in a situation where you want your `p` tags to be a tad bigger than the 'default':  
```tsx
const tagMap = { p: Body, h1: ... };
return (
  <>
    <HtmlMapper html={intro}>
      {{
        ...tagMap,
        p: ({ ...props }) => <Body variant="large" {...props} />,
      }}
    </HtmlMapper>
    <HtmlMapper html={text}>{tagMap}</HtmlMapper>
  </>
);
```

## Security
By default, `react-html-map` will ignore any tags that are not provided in your tag map.  
If you want to pass specific elements through 'as-is', you can define them with `null` in your tag mapping:
```tsx
<HtmlMapper html={html}>
  {{
    p: Body,
    ...
    strong: null,
    ul: null,
    li: null,
    br: null,
  }}
</HtmlMapper>
```

If you wish to have `react-html-map` pass through all tags it does not recognize, you can pass the `acceptUnknown` prop:
```tsx
<HtmlMapper
    html={html}
    // now we'll accept tags like strong by default,
    // but at the cost of predictibility and security.
    acceptUnknown
>
  {{ p: Body }}
</HtmlMapper>
```

This is however NOT recommended, as it might **leave you vulnerable to XSS attacks.**

# Install
```bash
npm i react-html-map
```

## TODO/goals
- [x] Library code
- [x] Write README
- [x] Basic tests (does it crash?)
- [x] Snapshot tests (does it render what we expect it to render?)
- [ ] Example website (long term goal)  
  An example exists in the `example/` folder at the moment, but it's not quite finished just yet.