import React from 'react'
import axios from 'axios';

import './pagecss/template.css';
import './pagecss/scss/_style.scss';
import './pagecss/scss/_common.scss';
import './pagecss/scss/_theme.scss';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(parse(cloneDay))}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

const CalendarPage = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };

    const [posts, setPosts] = React.useState([]);
    const [form, setForm] = React.useState({ id: '', title: '', author: '' });
    const [update, setUpdate] = React.useState({ id: '', title: '', author: '' });
    const { id, title, author } = update;
    const [open, setOpen] = React.useState(false);
  
    React.useEffect(() => {
      // read
      axios({ url: 'http://localhost:3001/posts', method: 'GET' }).then(
        ({ data }) => setPosts(data)
      );
    }, []);


    return (
        <div>
          <div id="template">
            <div id="back2">
             
              <div className="calendar">
              <h5>김눈송 선생님의 월간 과외 캘린더</h5>
                <RenderHeader
                    currentMonth={currentMonth}
                    prevMonth={prevMonth}
                    nextMonth={nextMonth}
                />
                <RenderDays />
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                />

                <br></br>
                <div style={{ padding: 20 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          border: '1px solid black',
        }}
      >
        <div style={{ marginRight: 10 }}>title: </div>
        <input
          type='text'
          style={{ color: 'black', width: 80 }}
          value={title}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, title: e.target.value }));
            setUpdate((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        <div style={{ marginRight: 10 }}>author: </div>
        <input
          type='text'
          style={{ color: 'black', width: 80 }}
          value={author}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, author: e.target.value }));
            setUpdate((prev) => ({ ...prev, author: e.target.value }));
          }}
        />
        <button
          onClick={() => {
            // create
            if (open === false) {
              axios({
                url: 'http://localhost:3001/posts',
                method: 'POST',
                data: form,
              }).then(({ data }) => setPosts((prev) => [...prev, data]));
            }
            // update
            else {
              axios({
                url: `http://localhost:3001/posts/${id}`,
                method: 'PUT',
                data: form,
              }).then(({ data }) =>
                setPosts((prev) =>
                  prev.map((post) => (post.id === id ? data : post))
                )
              );

              setUpdate((prev) => ({
                ...prev,
                id: '',
                author: '',
                title: '',
              }));
              setOpen(false);
            }
          }}
        >
          {open ? '수정완료' : '제출'}
        </button>
      </div>

      
    </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default CalendarPage
