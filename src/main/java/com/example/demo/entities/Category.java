package com.example.demo.entities;

import java.util.Set;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Category {
	
	@Id
	@org.hibernate.annotations.Type(type="uuid-char")
	private UUID categoryId;
	
	private String name;
	
	@OneToMany(mappedBy = "category")
	Set<UserCategory> users;

	public UUID getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(UUID groupId) {
		this.categoryId = groupId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public Set<UserCategory> getUsers() {
		return users;
	}

	public void setUsers(Set<UserCategory> users) {
		this.users = users;
	}
}
