import styled from 'styled-components';
import ekkoImage from './assets/ekko.png';

export const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  color: white;
  background-image: url(${ekkoImage});
  background-repeat: no-repeat;
  background-position: right top;
  background-size: auto 100%;
  padding: 32px;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StatusLabel = styled.span`
  font-size: 16px;
`;

export const StatusValue = styled.span<{ connected: boolean }>`
  font-size: 16px;
  color: ${props => props.connected ? '#4CAF50' : '#f44336'};
  font-weight: 700;
`;

export const UploadArea = styled.div<{ isDragging: boolean }>`
  width: 450px;
  height: 200px;
  border: 2px dashed ${props => props.isDragging ? '#4CAF50' : '#666'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(0, 0, 0, 0.2);

  &:hover {
    border-color: #888;
  }

  input {
    display: none;
  }
`;

export const UploadText = styled.p`
  font-size: 16px;
  color: #ccc;
  margin-top: 8px;
`;

export const Instructions = styled.div`
  font-size: 16px;
  color: #ccc;
  max-width: 450px;
  line-height: 1.5;
`;

export const InstructionLink = styled.span`
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
`;

export const Disclaimer = styled.div`
  position: fixed;
  bottom: 16px;
  left: 32px;
  font-size: 13px;
  color: #999;
  max-width: 800px;
  line-height: 1.6;
`;

export const MadeByContainer = styled.div`
  position: fixed;
  bottom: 16px;
  right: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const MadeByText = styled.span`
  font-size: 18px;
  color: #999;
`;

export const Logo = styled.img`
  height: 34px;
  width: auto;
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  height: 40px;
  margin: 0;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

export const HowToContainer = styled.div`
  font-size: 16px;
  color: #ccc;
  max-width: 450px;
  line-height: 1.5;
  margin-top: -16px;
`;

export const HowToTitle = styled.h2`
  font-size: 18px;
  color: #ccc;
  text-decoration: underline;
  margin: 0;
  margin-bottom: 10px;
`;

export const SyncButton = styled.button`
  width: 150px;
  background: rgba(0, 0, 0, 0.25);
  color: #f44336;
  border: 2px solid #f44336;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 24px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(244, 67, 54, 0.15);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 4px rgba(244, 67, 54, 0.2);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const FileInfo = styled.div`
  font-size: 16px;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FileName = styled.span`
  color: #4CAF50;
  font-weight: 500;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #bbb;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: underline;
  cursor: pointer;
  padding: 4px 8px;
  margin-top: 8px;
  transition: color 0.2s;
  align-self: flex-end;

  &:hover {
    color: #f44336;
  }
`;

export const AudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GameStatusContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: -16px;
`;

export const GameStatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ccc;
`;

export const GameStatusValue = styled.span`
  color: #4CAF50;
  font-weight: 500;
`; 