package com.example.demo.models;

public class BaseResponse {
	private String message;

	private ResponseType type;

	public BaseResponse() {
		this.type = ResponseType.OK;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ResponseType getType() {
		return type;
	}

	public void setType(ResponseType responseType) {
		this.type = responseType;
	}
}
