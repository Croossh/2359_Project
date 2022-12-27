import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import axios from 'axios';
import { baseAxios } from 'api';
import { OptionEnums } from 'types/enums';
import { useUserOptions } from 'hooks/useUserOptions';

type DiaryProps = {
  [key in OptionEnums]: boolean;
};

// 계속 객체로 관리되고있음.
// 아 문제를 알았다!
// TODO: 기존의 data는 그냥 객체 형태였다면 {OptionEnums: boolean}
// 수정후 patch로 보내는 데이터는 {firstLogin: boolean , createOption: {OptionEnums: boolean}} 형태임
// 둘이 형태가 다르니 계속 충돌날수밖에! ㅇㅋㅇㅋ!

function SetDiaryOption() {
  const checkStaticData: DiaryProps[] = [];
  const initialData: any = {};
  const [data, setData] = useState(initialData);
  const [isChecked, setIsChecked] = useState<DiaryProps[]>(checkStaticData);
  const { mutate } = useUserOptions();

  let optionData: DiaryProps;
  async function getOptionsData() {
    const res = await axios.get('/api/user/option', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    optionData = await res.data.createOption;
    setData(optionData);
  }

  useEffect(() => {
    getOptionsData();
  }, []);

  async function patchCheckData(obj: DiaryProps) {
    const data = {
      firstLogin: false,
      createOption: obj,
    };
    try {
      await baseAxios.patch('/api/user/option', data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setData(obj);
    } catch (e) {
      throw new Error();
    }
  }

  const checkedHandler = (e: OptionEnums) => {
    const newData = { ...data };
    newData[e] = !newData[e];
    setIsChecked(newData);
    patchCheckData(newData);
    mutate();
  };

  return (
    <Container>
      <ScriptArea>
        <Script>1. 일일 결산을할 때 고정적으로 적용할 옵션을 설정하는 페이지 입니다.</Script>
        <Script>2. 원하는 옵션을 체크하고 자신만의 결산 템플릿을 만들어 보세요!</Script>
      </ScriptArea>
      <CheckboxArea>
        <div>
          <CheckLabel htmlFor="todoCheck">
            <CheckInput
              type="checkbox"
              id="todoCheck"
              checked={data.TODO_LIST ?? ''}
              onChange={() => {
                checkedHandler(OptionEnums.TODO_LIST);
              }}
            />
            Todo 리스트 작성
          </CheckLabel>
          <p>👉 TodoList를 쓰고 관리할 수 있어요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="questionCheck">
            <CheckInput
              type="checkbox"
              id="questionCheck"
              checked={data.TODAY_QUESTION ?? ''}
              onChange={() => {
                checkedHandler(OptionEnums.TODAY_QUESTION);
              }}
            />
            오늘의 질문
          </CheckLabel>
          <p>👉 매일 새로운 질문을 랜덤으로 받아볼 수 있어요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="diaryCheck">
            <CheckInput
              type="checkbox"
              id="diaryCheck"
              checked={data.DIARY ?? ''}
              onChange={() => {
                checkedHandler(OptionEnums.DIARY);
              }}
            />
            일기 작성
          </CheckLabel>
          <p>👉 일기를 쓰고 오늘 하루를 마무리 해보세요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="emotionCheck">
            <CheckInput
              type="checkbox"
              id="emotionCheck"
              checked={data.EMOTION ?? ''}
              onChange={() => {
                checkedHandler(OptionEnums.EMOTION);
              }}
            />
            하루 감정
          </CheckLabel>
          <p>👉 오늘 하루 느꼈던 감정을 기록할 수 있어요!</p>
        </div>
        <div>
          <CheckLabel htmlFor="accountCheck">
            <CheckInput
              type="checkbox"
              id="accountCheck"
              checked={data.ACCOUNT_BOOK ?? ''}
              onChange={() => {
                checkedHandler(OptionEnums.ACCOUNT_BOOK);
              }}
            />
            가계부
          </CheckLabel>
          <p>👉 카테고리별로 오늘 지출/수익을 관리할 수 있어요!</p>
        </div>
      </CheckboxArea>
    </Container>
  );
}

export default SetDiaryOption;

const Container = tw.div`
  flex
  flex-col
  w-full
`;

const ScriptArea = tw.div`
  flex
  flex-col
  justify-center
  items-start
  my-10
  w-11/12
  mx-auto
  space-y-2
  shadow-xl
  p-8
  rounded-lg
  bg-neutral-100
`;

const Script = tw.div`
  text-lg
  text-bold
`;

const CheckboxArea = tw.div`
  flex
  flex-col
  justify-center
  items-start
  space-y-6
  my-4
  w-11/12
  mx-auto
`;

const CheckLabel = tw.label`
  text-2xl
  text-black
  flex
  flex-row
  items-center
  w-full
  select-none
`;

const CheckInput = tw.input`
  w-5
  h-5
  mr-3
  my-auto
`;
