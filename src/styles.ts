import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #181818;
  align-items: center;
  padding: 10px 30px 20px 30px;
  justify-content: space-between;
`;

export const ActionsContainer = styled.View``;

export const ImageContainer = styled.View`
  width: 100%;
  height: 50%;
  border-radius: 10px;
`;

export const ControlButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 20px;
`;

export const SongDetails = styled.View`
  align-items: center;
  justify-content:center;
  padding: 15px;
`;

export const SongName = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 26px; 
`;

export const BandName = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
`;

