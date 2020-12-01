package com.example.demo.entities;

import java.io.Serializable;
import java.util.UUID;

import javax.persistence.Column;

//@Embeddable
public class UserCategoryKey implements Serializable {
	
	@Column(name = "user_id")
	@org.hibernate.annotations.Type(type="uuid-char")
	private UUID userId;
	
	@Column(name = "category_id")
	@org.hibernate.annotations.Type(type="uuid-char")
	private UUID categoryId;
	
	public UUID getUserId() {
		return userId;
	}
	public void setUserId(UUID userId) {
		this.userId = userId;
	}
	public UUID getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(UUID categoryId) {
		this.categoryId = categoryId;
	}
}
