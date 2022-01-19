import styled from 'styled-components';

const Overlay = styled.div`
  background: #5d05a6;
  background: linear-gradient(
    320deg,
    hsl(273deg 94% 34%) 0%,
    hsl(277deg 97% 33%) 16%,
    hsl(281deg 100% 32%) 27%,
    hsl(284deg 100% 32%) 37%,
    hsl(287deg 100% 32%) 45%,
    hsl(290deg 100% 32%) 54%,
    hsl(293deg 100% 32%) 62%,
    hsl(296deg 100% 32%) 72%,
    hsl(299deg 98% 32%) 83%,
    hsl(302deg 94% 34%) 100%
  );
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;
`;

export default Overlay;
