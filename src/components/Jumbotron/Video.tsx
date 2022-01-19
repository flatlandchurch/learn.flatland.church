import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  object-fit: cover;
  z-index: -2;
  filter: blur(10%);

  @media (prefers-reduced-motion) {
    display: none;
  }
`;

export default Video;
