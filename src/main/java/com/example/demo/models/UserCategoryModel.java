package com.example.demo.models;

import java.util.UUID;

public class UserCategoryModel {
	
	private UUID userId;
	
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
