import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UpdateFormValue } from 'types/interfaces';
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

export const useDelete = (Data: UpdateFormValue) => {
  const navigate = useNavigate();
  axios
    .delete(`${process.env.REACT_APP_API_URL}/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`,
      },
    })
    .then((res) => {
      const data = res;
      console.log(data);
      alert('이용해주셔서 감사합니다.');
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
    });
};
