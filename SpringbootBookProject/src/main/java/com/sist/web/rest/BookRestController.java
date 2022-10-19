package com.sist.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import com.sist.web.dao.*;
import com.sist.web.entity.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class BookRestController {

	@Autowired
	private BookDAO dao;
	
	
	
	// 목록
	@GetMapping("/book/list_react")
	public List<BookEntity> bookListData(int page)
	{
		List<BookEntity> list = new ArrayList<BookEntity>();
		
		int rowSize = 14;
		int start = (rowSize*page)-rowSize;
		list = dao.bookListData(start);
		
		for(BookEntity vo:list)
		{
			String title = vo.getTitle();
			if(title.length() > 18)
			{
				title = title.substring(0, 18) + "...";
				vo.setTitle(title);
			}
			vo.setTitle(title);
		}
		
		for(BookEntity vo:list)
		{
			String pinfo = vo.getPinfo();
			if(pinfo.length() > 10)
			{
				pinfo = pinfo.substring(0, 10) + "...";
				vo.setPinfo(pinfo);
			}
			vo.setPinfo(pinfo);
		}
		
		
		return list;
	}
	
	
	
	// 전체 페이지
	@GetMapping("/book/list_total")
	public int bookTotalPage()
	{
		return dao.bookTotalpage();
	}
	
	
	
	
	
	
	// 카테고리 목록
	@GetMapping("/book/cate_list_react")
	public List<BookEntity> bookCateListData(int page, int cate)
	{
		List<BookEntity> list = new ArrayList<BookEntity>();
		
		int rowSize = 14;
		int start = (rowSize*page)-rowSize;
		list = dao.bookCateListData(start, cate);
		
		for(BookEntity vo:list)
		{
			String title = vo.getTitle();
			if(title.length() > 18)
			{
				title = title.substring(0, 18) + "...";
				vo.setTitle(title);
			}
			vo.setTitle(title);
		}
		
		for(BookEntity vo:list)
		{
			String pinfo = vo.getPinfo();
			if(pinfo.length() > 10)
			{
				pinfo = pinfo.substring(0, 10) + "...";
				vo.setPinfo(pinfo);
			}
			vo.setPinfo(pinfo);
		}
		
		
		return list;
	}
	
	
	
	// 카테고리 전체 페이지
	@GetMapping("/book/cate_list_total")
	public int bookCateTotalPage(int cate)
	{
		return dao.bookCateTotalpage(cate);
	}
	
	
	
	
	
	
	// 상세
	@GetMapping("/book/book_detail_react")
	public BookEntity bookDetailData(int no)
	{
		return dao.findByNo(no);
	}
	
	
	
	// 찾기 목록
	@GetMapping("book/find_react")
	public List<BookEntity> bookFindData(String ss, int page)
	{
		List<BookEntity> list = new ArrayList<BookEntity>();
		
		int rowSize = 12;
		int start = (rowSize*page)-rowSize;
		list = dao.bookFindData(ss, start);
		
		for(BookEntity vo:list)
		{
			String title = vo.getTitle();
			if(title.length() > 18)
			{
				title = title.substring(0, 18) + "...";
				vo.setTitle(title);
			}
			vo.setTitle(title);
		}
		
		return list;
	}
	
	
	// 찾기 전체 페이지
	@GetMapping("/book/find_totalpage")
	public int bookFindTotalPage(String ss)
	{
		int total = dao.bookSearchTotalPage(ss);
		
		return total;
	}
}
