import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Filters = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  display: flex;
  margin-top: 30px;
  padding: 15px 10px;
`;

export const FilterButton = styled.button`
  align-items: center;
  background: ${props => props.color};
  border: 0;
  border-right: 2px solid ${props => props.hover};
  border-bottom: 3px solid ${props => props.hover};
  border-radius: 4px;
  color: #fff;
  display: flex;
  font-weight: bold;
  justify-content: center;
  margin-right: 10px;
  padding: 15px;

  &:hover {
    border: 0;
  }

  ${props =>
    props.selected &&
    css`
      border: 0;
    `}
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  button {
    padding: 15px;
  }
`;
