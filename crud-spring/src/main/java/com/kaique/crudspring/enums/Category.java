package com.kaique.crudspring.enums;

public enum Category {
    FRONT_END("Front-End"), BACK_END("Back_End");

    private String value;

        private Category (String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

    @Override
    public String toString() {
        return value;
    }
}

