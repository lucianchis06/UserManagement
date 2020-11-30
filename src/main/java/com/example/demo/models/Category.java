package com.example.demo.models;

import java.util.Set;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Category {
	
	@Id
	@org.hibernate.annotations.Type(type="uuid-char")
	private UUID groupId;
	
	private String name;
	
	@OneToMany(mappedBy = "category")
	Set<UserCategory> users;

	public UUID getGroupId() {
		return groupId;
	}

	public void setGroupId(UUID groupId) {
		this.groupId = groupId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
