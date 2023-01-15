import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import './pagination.css';
import axios from 'axios';
import tw from 'tailwind-styled-components';
import ModalBasic from 'components/ModalBasic';
import Pagination from 'react-js-pagination';

interface IQnaProps {
  question: string | undefined;
  answer: string | undefined;
  tag: string | undefined;
  _id: string;
}

interface IData {
  selectedDate: string;
  qna: IQnaProps;
}

interface SelectedProps {
  [key: string]: boolean;
}

function Questions() {
  const initialData: IData[] = [];
  const tags: string[] = [];
  const newData: any = [];
  const tagSelectedAnswer: object[] = [];

  const [qnaList, setQnaList] = useState(initialData);
  const [tagList, setTagList] = useState(tags);
  const [isSelect, setIsSelect] = useState(newData);
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
  const [enabled, setEnabled] = useState(true);

  const currentDate = currentList.selectedDate;
  const year = currentDate.slice(0, 4);
  const month = currentDate.slice(4, 6);
  const day = currentDate.slice(6);

  async function getAllQuestionList() {
    const res = await axios.get('/api/contents/filter/qna', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await res.data;

    const tmp = data.map((item: any) => item.qna.tag);
    const tmpTagList: string[] = tmp
      .filter((value: string, idx: number) => tmp.indexOf(value) === idx)
      .filter((item: string) => item !== undefined);

    tmpTagList.forEach((item: string) => {
      newData[item] = true;
    });

    setQnaList(data);
    setTagList(tmpTagList);
  }

  function showSelectedAnswers() {
    if (qnaList.length !== 0) {
      const trueKey = Object.keys(isSelect).filter((key) => isSelect[key] === true);
      if (trueKey.length !== 0) {
        const tmpArr: object[] = [];
        for (let i = 0; i < trueKey.length; i += 1) {
          tmpArr.push(qnaList.filter((ele: IData) => trueKey[i] === ele.qna.tag));
        }
        const reducedArr: any = tmpArr.reduce((acc: any, cur: any) => {
          return [...acc, ...cur];
        });
        setResultAnswer(reducedArr);
      } else {
        setResultAnswer([]);
      }
    }
  }
  const handleTag = (item: string): void => {
    const newSelect = { ...isSelect };
    newSelect[item] = !newSelect[item];
    setIsSelect(newSelect);
  };
  const tagBtnClassName = (ele: string): string => {
    if (isSelect[ele]) {
      return selectBtnClass;
    }
    return nonSelectBtnClass;
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const showAnswer = () => {
    setPageList(resultAnswer.slice(8 * (page - 1), 8 * page));
  };

  const selectAllTag = () => {
    const newSelect = { ...isSelect };
    for (const key in newSelect) {
      newSelect[key] = true;
    }
    setIsSelect(newSelect);
  };

  const nonSelectAllTag = () => {
    const newSelect = { ...isSelect };
    for (const key in newSelect) {
      newSelect[key] = false;
    }
    setIsSelect(newSelect);
  };

  useEffect(() => {
    getAllQuestionList();
  }, []);

  useEffect(() => {
    showAnswer();
  }, [page, resultAnswer]);

  useEffect(() => {
    showSelectedAnswers();
    showAnswer();
  }, [qnaList, isSelect]);

  return (
    <Container>
      <div className="flex justify-end">
        <ToggleContainer>
          <div className="flex">
            <label className="inline-flex relative items-center mr-5 cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={enabled} readOnly />
              <ToggleButton
                onClick={() => {
                  setEnabled(!enabled);
                  if (enabled) {
                    nonSelectAllTag();
                  } else {
                    selectAllTag();
                  }
                }}
              >
                {null}
              </ToggleButton>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {enabled ? '모든 태그 선택' : '모두 선택 해제'}
              </span>
            </label>
          </div>
        </ToggleContainer>
      </div>

      <ButtonContainer>
        {tagList
          ? tagList.map((tagItem) => {
              return (
                <TagButtons
                  className={tagBtnClassName(tagItem)}
                  key={tagItem}
                  type="button"
                  onClick={() => {
                    handleTag(tagItem);
                    setPage(1);
                  }}
                >
                  {tagItem}
                </TagButtons>
              );
            })
          : null}
      </ButtonContainer>
      <AnswerContainer>
        <AnswerUl>
          {pageList.length !== 0 ? (
            pageList.map((ele: any) => (
              <AnswerList
                key={uuid()}
                onClick={() => {
                  setCurrentList(ele);
                  setShowModal(true);
                }}
              >
                {ele.qna.question}
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

export default Questions;

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
