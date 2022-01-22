import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  --shadow-color: 240deg 2% 59%;
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
    0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
    2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
    5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);
  background: #fff;
  padding: 12px;
  border-radius: 8px;

  p {
    font-size: 100px;
    font-weight: 800;
  }
`;

const CardTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #68737d;
`;

const Button = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  color: #68737d;
  cursor: pointer;
  width: 100%;
  margin-top: 12px;

  :not(span) {
    font-size: 14px;
  }

  &::before {
    content: '';
    width: 100%;
    display: block;
    height: 1px;
    background: #d0d4d7;
    position: relative;
    margin-right: 8px;
  }
`;

const Row = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  grid-gap: 1ch;
  align-items: end;

  span {
    margin-bottom: 24px;
    font-weight: 600;
  }
`;

type Props = {
  title: string;
  details?: string;
  value: number;
  unit?: {
    singular: string;
    plural: string;
  };
};

const MetricCard = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardTitle>{props.title}</CardTitle>
      <Row>
        <p>{props.value}</p>
        {props.unit && (
          <span> {Math.abs(props.value) === 1 ? props.unit.singular : props.unit.plural}</span>
        )}
      </Row>
      {!!props.details && (
        <div>
          <Button onClick={() => setOpen((s) => !s)}>
            Details{' '}
            <span className="material-icons-outlined">{open ? 'expand_less' : 'expand_more'}</span>
          </Button>
        </div>
      )}
    </Card>
  );
};

export default MetricCard;
