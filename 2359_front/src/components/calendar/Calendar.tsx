import React, { useEffect, useState } from 'react';
import { format, subMonths, addMonths } from 'date-fns';
import uuid from 'react-uuid';
import tw from 'tailwind-styled-components';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { calendarPage, calendarSummary } from 'recoil/calendarAtom';
import { clsEnums, emotionEnums } from 'types/enums';
import { EMOTIONS } from 'types/enumConverter';
import { useCalendarSum } from 'hooks/useCalendarSum';
import { CalendarWeeks, dayColor, emotionEmoji, takeMonth, todayColor } from './Utils';

type AccountProps = {
  [key in clsEnums]: number;
};
interface SumObject {
  date: string;
  emotion: emotionEnums;
  etc: boolean;
  account: AccountProps;
}

function Calendar() {
  const [currentDate, setCurrentDate] = useRecoilState(calendarPage);
  const [diaryData, setDiaryData] = useRecoilState(calendarSummary);
  const navigate = useNavigate();
  const { data, isLoading } = useCalendarSum();
  console.log('isLoading', isLoading);

  useEffect(() => {
    setDiaryData(data);
  }, [data]);

  const Monthdate = takeMonth(currentDate)();
  const curMonth = () => {
    setCurrentDate(new Date());
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const onDateClick = (day: Date) => {
    const diaryId = format(day, 'yyyyMMdd');

    setCurrentDate(day);
    navigate(`/diary/${diaryId}`);
  };

  return (
    <CalendarContainer>
      <HeaderContainer>
        <div>
          <CalendarYear>{format(currentDate, 'yyyy')}년</CalendarYear>
          <CalendarMonth>{format(currentDate, 'M')}월</CalendarMonth>
        </div>
        <div className="flex">
          <Button btntype="basic" onClick={curMonth}>
            오늘
          </Button>
          <Button btntype="save" onClick={prevMonth}>
            이전
          </Button>
          <Button btntype="save" onClick={nextMonth}>
            다음
          </Button>
        </div>
      </HeaderContainer>
      <CalendarWeeks />
      {Monthdate.map((week: Date[]) => (
        <DaysContainer key={uuid()}>
          {week.map((day: Date) => (
            <CalendarDays key={day.toString()} className={`${todayColor(day)}`} onClick={() => onDateClick(day)}>
              <CalendarDay className={`${dayColor(day, currentDate)}`}>{format(day, 'dd')}</CalendarDay>
              {diaryData?.map(
                (item: SumObject) =>
                  item.date === format(day, 'yyyyMMdd') && (
                    <div key={item.date} className="relative text-gray-500 text-sm h-full">
                      <span className="text-xs absolute -top-5 right-0">{item.etc ? '🟢' : null}</span>
                      <div className="flex flex-col justify-around h-full px-1">
                        <div className="flex justify-center">
                          <span className="text-2xl">{emotionEmoji(EMOTIONS[item.emotion])}</span>
                        </div>
                        <div className="flex-col">
                          <span className="flex justify-end">
                            {item.account.INCOME && `+${Number(item.account.INCOME).toLocaleString()}원`}
                          </span>
                          <span className="flex justify-end">
                            {item.account.EXPENSE && `-${Number(item.account.EXPENSE).toLocaleString()}원`}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </CalendarDays>
          ))}
        </DaysContainer>
      ))}
    </CalendarContainer>
  );
}
export default Calendar;

const CalendarContainer = tw.div`
bg-white
rounded-lg 
shadow 
overflow-hidden 
h-full
`;
const HeaderContainer = tw.div`
flex 
justify-between 
py-6
px-6
`;
const CalendarYear = tw.span`
text-lg
font-gray-400
`;
const CalendarMonth = tw.span`
text-2xl
font-bold 
ml-2
`;
const DaysContainer = tw.div`
grid 
grid-cols-7
`;
const CalendarDays = tw.div`
cursor-pointer
h-28
flex 
flex-col 
border-b 
border-r 
px-2 
pt-2
relative

hover:bg-primaryDark
active:bg-primary
transition-colors ease-in-out duration-300
`;

const CalendarDay = tw.div`
flex 
font-bold 
inline-flex 
w-5
h-5
items-center 
justify-center
text-center
`;
