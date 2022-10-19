package com.sist.web.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

/*
 * no
img
title
binfo
author
pinfo
info
isbn
term
cate
 */

@Entity(name = "book") // table 이름
@Getter
@Setter
public class BookEntity {

	@Id
	private int no;
	private int cate;
	private String img, title, binfo, author, pinfo, info, isbn, term;
	
}
