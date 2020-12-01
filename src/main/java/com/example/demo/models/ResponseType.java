package com.example.demo.models;

public enum ResponseType {
	OK(0),
	Exception(1);
	
	private final int value;

	ResponseType(int newValue) {
        value = newValue;
    }

    public int getValue() { return value; }
}
