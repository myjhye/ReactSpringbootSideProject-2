package com.sist.web.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sist.web.entity.BookEntity;

@Repository
public interface BookDAO extends JpaRepository<BookEntity, Integer> {

	// 목록
	@Query(value = "SELECT * FROM book ORDER BY no ASC "
						+ "LIMIT :start, 14", nativeQuery = true)
	public List<BookEntity> bookListData(@Param("start") Integer start);
	
	
	// 전체 페이지
	@Query(value = "SELECT CEIL(COUNT(*)/14.0) FROM book", nativeQuery = true)
	public int bookTotalpage();
	
	
	
	
	
	// 카테고리 목록
	@Query(value = "SELECT * FROM book WHERE cate=:cate "
			+ "ORDER BY no ASC "
			+ "LIMIT :start, 14", nativeQuery = true)
	public List<BookEntity> bookCateListData(@Param("start") Integer start, @Param("cate") Integer cate);
	
	
	// 카테고리 전체 페이지
	@Query(value = "SELECT CEIL(COUNT(*)/14.0) FROM book WHERE cate=:cate", nativeQuery = true)
	public int bookCateTotalpage(@Param("cate") Integer cate);
	
	
	
	
	
	
	
	// 상세 
	public BookEntity findByNo(int no);
	
	
	// 찾기
	@Query(value = "SELECT * FROM book "
			+ "WHERE title LIKE CONCAT('%', :ss, '%') "
			+ "ORDER BY no ASC "
			+ "LIMIT :start, 12", nativeQuery = true)
	public List<BookEntity> bookFindData(@Param("ss") String ss, @Param("start") Integer start);
	
	
	// 찾기 페이징
	@Query(value = "SELECT CEIL(COUNT(*)/12.0) FROM book "
			+ "WHERE title LIKE CONCAT('%', :ss, '%')", nativeQuery = true)
	public int bookSearchTotalPage(@Param("ss") String ss);
	
}
