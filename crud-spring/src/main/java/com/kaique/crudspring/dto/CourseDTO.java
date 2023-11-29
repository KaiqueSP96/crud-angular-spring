package com.kaique.crudspring.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.kaique.crudspring.enums.Category;
import com.kaique.crudspring.enums.validation.ValueOfEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public record CourseDTO (
        @JsonProperty("_id")
         Long id,

        @NotNull  @NotBlank @Size(min = 5, max = 100)   String name,

        @NotBlank @NotNull @ValueOfEnum(enumClass = Category.class) String category,

        @NotBlank @NotNull List <LessonDTO> lessons

){}


