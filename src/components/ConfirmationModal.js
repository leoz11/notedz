import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: ${(props) => (props.darkMode ? '#333' : '#fff')};
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  border: 2px solid ${(props) => (props.darkMode ? '#fff' : '#000')};
  border-radius: 10px;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Fira Code', monospace;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const ModalButton = styled.button`
  background: none;
  border: 2px solid ${(props) => (props.darkMode ? '#fff' : '#000')};
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, color 0.3s;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: ${(props) => (props.darkMode ? '#444' : '#eee')};
  }
`;

const ConfirmationModal = ({ isOpen, darkMode, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer darkMode={darkMode}>
        <h2>deseja realmente apagar essa nota?</h2>
        <ButtonGroup>
          <ModalButton darkMode={darkMode} onClick={onConfirm}>
            <FaCheck /> sim
          </ModalButton>
          <ModalButton darkMode={darkMode} onClick={onCancel}>
            <FaTimes /> não
          </ModalButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default ConfirmationModal;
