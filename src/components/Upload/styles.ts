import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface IUploadProps {
  isDragActive: boolean;
  isDragReject: boolean;
  refKey?: string;
  [key: string]: any;
  type?: 'error' | 'success' | 'default';
}

const dragActive = css`
  border-color: #12a454;
`;

const dragReject = css`
  border-color: #e83f5b;
`;

export const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 1.5px dashed #969cb3;
  border-radius: 5px;
  cursor: pointer;
  transition: height 0.2s ease;
  ${(props: IUploadProps): false | FlattenSimpleInterpolation =>
    props.isDragActive && dragActive}
  ${(props: IUploadProps): false | FlattenSimpleInterpolation =>
    props.isDragReject && dragReject}
`;

const messageColors = {
  default: '#fff',
  error: '#e83f5b',
  success: '#12a454',
};

export const UploadMessage = styled.p`
  display: flex;
  font-size: 16px;
  line-height: 24px;
  padding: 48px 0;
  color: ${({ type }: IUploadProps) => messageColors[type || 'default']};
  justify-content: center;
  align-items: center;
`;
