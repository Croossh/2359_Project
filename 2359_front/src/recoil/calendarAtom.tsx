import React from 'react';
import uuid from 'react-uuid';
import { atom } from 'recoil';

const calendarPage = atom({
  key: `calendarPage/${uuid()}`,
  default: new Date(),
});

const calendarSummary = atom({
  key: `calendarSummary/${uuid()}`,
  default: [],
});

export { calendarPage, calendarSummary };
