import * as React from 'react';
import { FillButton, List, Paragraph, Text, Title } from 'tailwind-react-ui';
import 'tailwindcss/dist/tailwind.min.css';

const tagMap = {
    h1: (props) => <Title size={6} {...props} />,
    h2: (props) => <Title size={5} {...props} />,
    h3: (props) => <Title size={4} {...props} />,
    h4: (props) => <Title size={3} {...props} />,
    h5: (props) => <Title size={2} {...props} />,
    p: Paragraph,
    ul: (props) => <List padding ordered {...props} />,
    li: Text,
    strong: null, // <-- TODO doesn't work?
    em: null,
    br: null,
    button: ({ children }) => (
        <FillButton bg="purple" text="white">
            {children}
        </FillButton>
    ),
};
export default tagMap;
