import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MainPage from './pages/MainPage';
import SignupPageA from './pages/SignupPageA';
import SignupPageB from './pages/SignupPageB';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import CalendarPage from './pages/CalendarPage';
import CardPage from './pages/CardPage';
import SubjectPage from './pages/SubjectPage';
import ClassPage from './pages/ClassPage';
import FeedbackPage from './pages/FeedbackPage';
import NoticePage from './pages/NoticePage';
import RolePage from './pages/RolePage';
import SamplePage from './pages/SamplePage';

function App() {
  return (
    <div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<StartPage />}></Route>
					<Route path="/mainpage" element={<MainPage />}></Route>
					<Route path="/signuppageA" element={<SignupPageA />}></Route>
					<Route path="/signuppageB" element={<SignupPageB />}></Route>
					<Route path="/rolepage" element={<RolePage />}></Route>
					<Route path="/loginpage" element={<LoginPage />}></Route>
					<Route path="/mypage" element={<MyPage />}></Route>
					<Route path="/calendarpage" element={<CalendarPage />}></Route>
					<Route path="/cardpage" element={<CardPage />}></Route>
					<Route path="/subjectpage" element={<SubjectPage />}></Route>
					<Route path="/classpage/:id" element={<ClassPage />}></Route>
					<Route path="/feedbackpage" element={<FeedbackPage />}></Route>
					<Route path="/noticepage" element={<NoticePage />}></Route>
					<Route path="/samplepage" element={<SamplePage />}></Route>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
