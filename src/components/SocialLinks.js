import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaBluesky } from "react-icons/fa6";

const SocialLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: ${props => props.theme.text};
  text-decoration: none;
  border: 1px solid ${props => props.theme.border};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.text};
    color: ${props => props.theme.background};
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  width: 24px;
  display: flex;
  justify-content: center;
`;

const ArrowIcon = styled.span`
  margin-left: auto;
`;

const SocialLinks = () => {
  return (
    <SocialLinksWrapper>
      <SocialLink href="https://www.linkedin.com/in/leleo-oliveira/" target="_blank" rel="noopener noreferrer">
        <IconWrapper><FaLinkedin /></IconWrapper>
        LinkedIn
        <ArrowIcon>↗</ArrowIcon>
      </SocialLink>
      <SocialLink href="https://github.com/leoz11" target="_blank" rel="noopener noreferrer">
        <IconWrapper><FaGithub /></IconWrapper>
        GitHub
        <ArrowIcon>↗</ArrowIcon>
      </SocialLink>
      <SocialLink href="mailto:leo11.contato@gmail.com">
        <IconWrapper><FaEnvelope /></IconWrapper>
        Email
        <ArrowIcon>↗</ArrowIcon>
      </SocialLink>
      <SocialLink href="https://bsky.app/profile/leozvlr.bsky.social" target="_blank" rel="noopener noreferrer">
        <IconWrapper><FaBluesky /></IconWrapper>
        Bluesky
        <ArrowIcon>↗</ArrowIcon>
      </SocialLink>
    </SocialLinksWrapper>
  );
};

export default SocialLinks;