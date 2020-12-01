package com.example.demo.models;

public class GeneralResponse<T> extends BaseResponse {
	private T data;
	
	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
}
