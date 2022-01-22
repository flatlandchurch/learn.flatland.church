import React from 'react';
import styled from 'styled-components';

import Header from '../../components/Header';
import MetricCard from './MetricCard';
import Section from '../../components/Section';

const KPIGrid = styled.div`
  padding: 24px;
  max-width: 720px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 12px;

  @media screen and (max-width: 411px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const SectionTitle = styled.h2`
  padding: 24px 24px 0;
  max-width: 720px;
  margin: 0 auto;
  font-size: 16px;
  color: #2f3941;
`;

const Admin = () => {
  return (
    <Section>
      <Header />
      <SectionTitle>At a Glance</SectionTitle>
      <KPIGrid>
        <MetricCard title="Avg. NPS" details="" value={90} />
        <MetricCard
          title="Avg. Time to Proficiency"
          details=""
          value={14}
          unit={{
            singular: 'week',
            plural: 'weeks',
          }}
        />
        <MetricCard title="Classes Completed" details="This year" value={12} />
        <MetricCard title="No. Active Users" details="" value={12} />
        <MetricCard title="Accumulated Class Time" details="This year" value={12} />
        <MetricCard title="Course Completion Rate" details="This year" value={12} />
      </KPIGrid>
      <SectionTitle>Summary</SectionTitle>
      <p>Hello</p>
    </Section>
  );
};

export default Admin;
