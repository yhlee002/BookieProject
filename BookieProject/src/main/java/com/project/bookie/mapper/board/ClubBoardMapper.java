package com.project.bookie.mapper.board;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.project.bookie.dto.board.Board;
import com.project.bookie.dto.comment.Comment;
import com.project.bookie.dto.reply.Reply;

//독서클럽 게시판의 매퍼(DB의 club_board테이블 사용)
public interface ClubBoardMapper {

	// 하나의 게시글(댓글까지)
	public Board getBoardByBoardIdWithComment(long boardId);

	// 하나의 게시글에 달린 댓글 목록 불러오기
	public List<Comment> getAllCommentListByBoardId(long boardId);

	// 하나의 댓글에 달린 리플 불러오기
	public List<Reply> getReplyByCommentId(int commentId);

	// 게시판 글 전체를 불러오는 기능
	public List<Board> getAllBoards();

	// 메인화면에 표시할 최신 글 조회
	public List<Board> getBoardListToMain();

	// 조건(글 제목)에 따른 검색(게시판 내에서의 검색)
	public List<Board> getListByTitle(@Param("searchInfo") String searchInfo);

	// 조건(내용)에 따른 검색(게시판 내에서의 검색)
	public List<Board> getListByContent(@Param("searchInfo") String searchInfo);

	// 조건(작성자)에 따른 검색(게시판 내에서의 검색)
	public List<Board> getListByWriter(@Param("searchInfo") String searchInfo);

	// 작성자에 따른 검색(사용자의 자신이 쓴 글 조회 기능)
	public List<Board> getListByUserId(long id); // select * from board.user_id = #{작성자 id}(로그인 되어있는 세션에서 정보를 받아옴)

	//글 조회
	public Board selectBoard(String id);
	
	// 글 등록
	public void insertBoard(Board board);

	// 글 수정
	public void updateBoard(@Param("id") String id, @Param("genreId")String genreId, @Param("title") String title, @Param("content") String content);

	// 글 삭제
	public void deleteBoard(long id);

	// 페이지네이션
	// 한 페이지에 보여질 게시글 리스트
	public List<Board> getBoardListByCurrentPage(@Param("firstRow") int firstRow, @Param("endRow") int endRow);

	// 총 게시글 수
	public int getCountOfTotalBoard();
	
}
