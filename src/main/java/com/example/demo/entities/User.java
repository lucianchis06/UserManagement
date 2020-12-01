package com.example.demo.models;

import java.util.Set;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;


@Entity
public class User {

	@Id
	@org.hibernate.annotations.Type(type="uuid-char")
	private UUID userId;

	private String firstname;
	
	private String lastname;
	
	@Column(unique = true)
	private String email;
	
	private String password;
	
	private boolean isAdmin;
	
	@OneToMany(mappedBy = "user")
	Set<UserCategory> categories;
	
	public UUID getUserId() {
		return userId;
	}

	public void setUserId(UUID userId) {
		this.userId = userId;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public Set<UserCategory> getCategories() {
		return categories;
	}

	public void setCategories(Set<UserCategory> categories) {
		this.categories = categories;
	}
	
}
