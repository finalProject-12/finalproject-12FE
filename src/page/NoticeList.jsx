import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getNoticeList } from '../api/notice';
import writeIcon from '../assets/writeIcon.png';
import * as CSS from '../style/globalStyle';

const NoticeList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isManager, setIsManager] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('type')) {
      setIsManager(localStorage.getItem('type'));
    }
  }, []);
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };
  const currentPageNum = currentPage !== 0 ? currentPage - 1 : currentPage;
  // ['getNoticeList', currentPage]이거 알아보기
  const { data } = useQuery(['getNoticeList', currentPageNum], () =>
    getNoticeList(currentPageNum)
  );

  const noticeDetailPageMoveButtonHandler = id => {
    navigate(`/noticeList/${id}`);
  };
  const writeNoticeMoveButtonHandler = () => {
    navigate('/WriteNotice');
  };

  return (
    <BackgroundMain>
      <NoticeH1>공지사항</NoticeH1>

      <WriteBoxDiv>
        {isManager === 'ADMIN' && (
          <WriteButton>
            <WriteIconImg src={writeIcon} alt="notice write icon" />
            <WriteTextP onClick={writeNoticeMoveButtonHandler}>
              {' '}
              글 작성{' '}
            </WriteTextP>
          </WriteButton>
        )}
      </WriteBoxDiv>

      <ListSection>
        <TitleDiv>
          <NoticeP size="108px">번호</NoticeP>
          <NoticeP size="617px">제목</NoticeP>
          <NoticeP size="150px">작성자</NoticeP>
          <NoticeP size="250px">작성날짜</NoticeP>
        </TitleDiv>
        {data?.content.map(item => {
          return (
            <NoticeItemDiv key={item.id}>
              <NoticeP size="108px">{item.id}</NoticeP>
              <NoticeP
                size="617px"
                cursor="pointer"
                onClick={() => noticeDetailPageMoveButtonHandler(item.id)}
              >
                {item.title}
              </NoticeP>
              <NoticeP size="150px">{item.nickname}</NoticeP>
              <NoticeP size="250px">{item.createdAt}</NoticeP>
            </NoticeItemDiv>
          );
        })}
      </ListSection>
      {data && (
        <CSS.PaginationBoxDiv>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={8}
            totalItemsCount={data.totalElements}
            pageRangeDisplayed={5}
            initialPage={0}
            prevPageText="<"
            nextPageText=">"
            onChange={handlePageChange}
          />
        </CSS.PaginationBoxDiv>
      )}
    </BackgroundMain>
  );
};

export default NoticeList;

const BackgroundMain = styled.main`
  margin-left: auto;
  margin-right: auto;
  height: 700px;
  width: 1127px;
`;
const NoticeH1 = styled.h1`
  font-weight: 800;
  font-size: 32px;
  line-height: 43px;
  margin-top: 70px;
  margin-bottom: 25px;
`;
const ListSection = styled.section`
  border-top: 1px solid #dadada;
  height: 550px;
`;

const TitleDiv = styled.div`
  width: 1127px;
  height: 60px;
  border-bottom: 1px solid #dadada;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fafafa;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;
const NoticeItemDiv = styled.div`
  width: 1127px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #dadada;
`;
const NoticeP = styled.p`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => `${props.size}`};
  cursor: ${props => `${props.cursor}`};
`;
const WriteBoxDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 30px;
  margin-bottom: 20px;
  height: 31px;
`;
const WriteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const WriteIconImg = styled.img`
  width: 20px;
  height: 20px;
`;
const WriteTextP = styled.p`
  font-weight: 600;
  font-size: 20px;
  /* height: 20px; */
  color: #686868;
`;
