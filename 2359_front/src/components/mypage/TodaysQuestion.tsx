import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import './Questions.css';
import tw from 'tailwind-styled-components';
import ModalBasic from 'components/ModalBasic';
import Pagination from 'react-js-pagination';
import useSWR from 'swr';
import { headerAxios } from 'api';

interface IQnaProps {
  question: string;
  answer: string;
  tag: string;
  _id: string;
}

interface IData {
  selectedDate: string;
  qna: IQnaProps;
}

function TodaysQuestion() {
  const initalQnaData: IData[] = [];
  const initalTagList: Record<string, boolean>[] = [];
  const tagSelectedAnswer: object[] = [];

  const [qnaData, setQnaData] = useState(initalQnaData);
  const [tagList, setTagList] = useState(initalTagList);
  const [resultAnswer, setResultAnswer] = useState(tagSelectedAnswer);
  const [page, setPage] = useState(1);
  const [pageList, setPageList] = useState(tagSelectedAnswer);
  const [showModal, setShowModal] = useState(false);
  const [currentList, setCurrentList] = useState({
    selectedDate: '',
    qna: {
      question: '',
      answer: '',
      tag: '',
    },
  });

  const currentDate = currentList.selectedDate;
  const year = currentDate.slice(0, 4);
  const month = currentDate.slice(4, 6);
  const day = currentDate.slice(6);

  const sliceDate = (date: string) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6);
    return [year, '/', month, '/', day].join('');
  };

  const fetcher = async (url: string) => {
    const token = localStorage.getItem('token') ?? '';
    const res = await headerAxios(token).get(url);
    return res.data;
  };

  // 이렇게 하니까.. undefined는 거를수 있는데 undefined를 만나버리면 더이상 리랜더링을 하지 않음
  const { data, isValidating } = useSWR<IData[]>(`/api/contents/filter/qna`, fetcher);

  const getAllQuestionList = async () => {
    if (data) {
      // 태그따로 만들어주는 영역 Record<string, boolean>[]
      const tmp = data.map((item) => item.qna.tag);
      const tmpTagList: Record<string, boolean>[] = tmp
        .filter((item, idx) => tmp.indexOf(item) === idx)
        .map((tag) => {
          return { [tag as string]: true };
        });

      setQnaData(data);
      setTagList(tmpTagList);
    }
  };

  const handleTag = (item: string): void => {
    const newSelect = [...tagList];

    for (let i = 0; i < newSelect.length; i += 1) {
      if (Object.keys(newSelect[i]).includes(item)) {
        newSelect[i][item] = !newSelect[i][item];
      }
    }
    setTagList(newSelect);
  };

  const showSelectedAnswers = () => {
    if (tagList.length !== 0) {
      const trueKeyList: string[] = [];
      for (let i = 0; i < tagList.length; i += 1) {
        const tmpTrueTag = Object.keys(tagList[i]).filter((key) => tagList[i][key] === true);
        trueKeyList.push(...tmpTrueTag);
      }

      if (trueKeyList.length !== 0) {
        const tmpArr: object[] = [];
        for (let i = 0; i < trueKeyList.length; i += 1) {
          tmpArr.push(qnaData.filter((ele: IData) => trueKeyList[i] === ele.qna.tag));
        }
        const reducedArr = tmpArr.reduce((acc: object[], curr) => {
          return [...acc, ...(curr as object[])];
        }, []);
        setResultAnswer(reducedArr);
      } else {
        setResultAnswer([]);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const showAnswer = () => {
    setPageList(resultAnswer.slice(8 * (page - 1), 8 * page));
  };

  // swr의 반환값중 isValidating(요청이나 갱신 로딩의 여부) 를 이용해서 useEffect 를 이용해서 리랜더링을 하게 만듬
  useEffect(() => {
    getAllQuestionList();
  }, [isValidating]);

  useEffect(() => {
    showAnswer();
  }, [page, resultAnswer]);

  useEffect(() => {
    showSelectedAnswers();
    showAnswer();
  }, [qnaData, tagList]);

  return (
    <Container>
      <ButtonContainer>
        {tagList
          ? tagList.map((tagItem) => {
              return (
                <TagButtons
                  key={uuid()}
                  className={Object.values(tagItem)[0] ? selectBtnClass : nonSelectBtnClass}
                  type="button"
                  onClick={() => {
                    handleTag(Object.keys(tagItem)[0]);
                    showSelectedAnswers();
                  }}
                >
                  {Object.keys(tagItem)[0]}
                </TagButtons>
              );
            })
          : null}
      </ButtonContainer>
      <AnswerContainer>
        <AnswerUl>
          {pageList.length !== 0 ? (
            // IData 형식으로 받는데 왜 안됨?
            pageList.map((ele: any) => (
              <AnswerList
                key={uuid()}
                onClick={() => {
                  setCurrentList(ele);
                  setShowModal(true);
                }}
              >
                <div className="flex justify-between">
                  <div>{ele.qna.question}</div>
                  <div>작성일: {sliceDate(ele.selectedDate)}</div>
                </div>
              </AnswerList>
            ))
          ) : (
            <NoAnswer>선택된 태그가 없어요. 😢</NoAnswer>
          )}
        </AnswerUl>
      </AnswerContainer>
      <Pagination
        activePage={page}
        itemsCountPerPage={8}
        totalItemsCount={resultAnswer.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
      {showModal ? (
        <ModalBasic title={currentList.qna.question} closeText="닫기" cancelHandler={() => setShowModal(false)}>
          <div>작성날짜: {`${year}년 ${month}월 ${day}일`}</div>
          <div>답변: {currentList.qna.answer}</div>
        </ModalBasic>
      ) : null}
    </Container>
  );
}

export default TodaysQuestion;

const Container = tw.div`
  w-full  
  flex
  align-center
  flex-col
  space-y-4
`;

// 태그영역
const ButtonContainer = tw.div`
  w-[94%]
  mx-auto
  min-h-[60px]
`;

const TagButtons = tw.button`
  mr-3
  w-16
  h-7  
`;

const selectBtnClass = `
  inline-block px-2.5 py-1 bg-blue-600 text-white font-medium text-xs leading-tight rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg 
  mr-3
  mb-3
  text-xs
  
`;

const nonSelectBtnClass = `
  inline-block px-2.5 py-1 text-blue font-medium text-xs leading-tight rounded-xl shadow-md hover:shadow-lg hover:bg-neutral-300
  mr-3
  mb-3
  text-xs
`;

// 질문 리스트 영역
const AnswerContainer = tw.div`
  w-full
  min-h-[525px]
`;

const AnswerUl = tw.ul`
  w-full
  p-4
`;

const AnswerList = tw.li`
  rounded-md
  w-full
  shadow-md
  p-3
  m-3
  bg-gray-100
  hover:bg-gray-200
  active:bg-stone-300
  cursor-pointer
`;

export const NoAnswer = tw.div`
text-center
text-xl
font-bold
`;

const ToggleContainer = tw.div`
  flex flex-col items-center justify-center
`;

const ToggleButton = tw.div`
  w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600
`;
