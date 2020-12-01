package com.example.demo.entities;

import java.io.Serializable;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@IdClass(UserCategoryKey.class)
public class UserCategory implements Serializable {
 
    @Id
	@Column(name = "user_id")
	@org.hibernate.annotations.Type(type="uuid-char")
	private UUID userId;
	
	@Id
	@Column(name = "category_id")
	@org.hibernate.annotations.Type(type="uuid-char")
	private UUID categoryId;
	
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
 
    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;

  //@EmbeddedId
  //private UserCategoryKey id;
	
    
//	public UserCategoryKey getId() {
//		return id;
//	}
//
//	public void setId(UserCategoryKey id) {
//		this.id = id;
//	}
    
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
}
