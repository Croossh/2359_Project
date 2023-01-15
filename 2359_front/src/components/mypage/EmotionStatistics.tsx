import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { ResponsiveBar } from '@nivo/bar';
import useSWR from 'swr';
import { headerAxios } from 'api';
import { emotion } from 'types/enums';
import { EMOTIONS } from 'types/enumConverter';
import { getMonthDate } from 'utilities/date';
import { EmotionStaticProps } from 'types/interfaces';
import { NoAnswer } from './Questions';

const date = new Date();
const currentMonth = date.getMonth() + 1;
const monthDate = getMonthDate(date);

function EmotionStatistics() {
  const initialEmotionList: EmotionStaticProps[] = [];
  const [emotionList, setEmotionList] = useState<EmotionStaticProps[]>(initialEmotionList);

  const fetcher = async (url: string) => {
    const token = localStorage.getItem('token') ?? '';
    const res = await headerAxios(token).get(url);
    return res.data;
  };

  // 이렇게 하니까.. undefined는 거를수 있는데 undefined를 만나버리면 더이상 리랜더링을 하지 않음
  const { data, isValidating } = useSWR(`/api/contents/filterEmotion/${monthDate}`, fetcher);

  async function getFilterEmotion() {
    const convert: EmotionStaticProps = Object.entries(data).reduce((acc, [key, val]) => {
      return { ...acc, [EMOTIONS[key as emotion]]: val };
    }, {});

    convert.name = '감정';
    setEmotionList([convert]);
  }

  useEffect(() => {
    getFilterEmotion();
  }, [isValidating]);

  return (
    <Container>
      <BarChartContainer>
        <StatisticsScript>감정 통계 - {currentMonth}월😘</StatisticsScript>
        {emotionList ? (
          <ResponsiveBar
            data={emotionList}
            keys={Object.values(EMOTIONS)}
            margin={{ top: 30, right: 130, bottom: 60, left: 60 }}
            indexBy="name"
            padding={0.1}
            groupMode="grouped"
            innerPadding={30}
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'pastel2' }}
            borderRadius={1}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 1.1]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '개수',
              legendPosition: 'middle',
              legendOffset: 50,
            }}
            // axisLeft={{
            //   tickSize: 6,
            //   tickPadding: 5,
            //   tickRotation: 0,
            //   legend: '감정',
            //   legendPosition: 'middle',
            //   legendOffset: -50,
            // }}
            enableGridX
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.6]],
            }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
          />
        ) : (
          <NoAnswer>이번달에는 감정선택을 안해주셨군요!😢</NoAnswer>
        )}
      </BarChartContainer>
    </Container>
  );
}

export default EmotionStatistics;

export const Container = tw.div`
  w-full
`;

export const BarChartContainer = tw.div`
  w-[800px]
  h-[600px]
  mx-auto
  my-0
`;

export const StatisticsScript = tw.div`
  text-center
  font-bold
  text-2xl
  mt-5
`;
