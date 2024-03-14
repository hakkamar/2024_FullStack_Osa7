import styled from "styled-components";

import { Link } from "react-router-dom";

export const Title2 = styled.h2`
  font-size: 2em;
  text-align: center;
  text-shadow: 2px 2px 2px grey;
  color: #bf4f74;
`;

export const Title3 = styled.h3`
  font-size: 1.5em;
  text-align: left;
  text-shadow: 2px 2px 2px grey;
  color: #bf4f74;
`;

export const Title4 = styled.h4`
  font-size: 1.5em;
  text-align: center;
  text-shadow: 2px 2px 2px grey;
  color: #bf4f74;
`;

export const Form = styled.form`
  font-size: 1em;
  padding: 0.25em 0.5em;
  background: Bisque;
  border: 1px solid Chocolate;
  border-radius: 3px;
`;

export const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

export const Input = styled.input`
  margin: 0.25em;
`;

export const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

export const Navigation = styled.div`
  background: BurlyWood;
  padding: 0.5em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

/*
const Link = ({ className, children }) => (
  <a className={className}>{children}</a>
);
*/
export const StyledLink = styled(Link)`
  color: #bf4f74;
  padding: 0.25em;
  font-weight: bold;
`;

export const Lista = styled.div`
  padding: 0.5em;
  margin: 10px;
  background: Bisque;
  border: 1px solid Black;
`;

export const Ilmoitus = styled.div`
  background: lightgrey;
  color: black;
  font-size: 1em;
  font-weight: bold;
  margin: 1em;
  padding: 2em 1em;
  border: 2px solid green;
  border-radius: 3px;
`;

// A new component based on Ilmoitus, but with some override styles
export const Errori = styled(Ilmoitus)`
  background: tomato;
  border-color: red;
`;
