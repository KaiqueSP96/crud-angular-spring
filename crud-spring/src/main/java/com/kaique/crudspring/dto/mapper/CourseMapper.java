package com.kaique.crudspring.dto.mapper;

import com.kaique.crudspring.dto.CourseDTO;
import com.kaique.crudspring.dto.LessonDTO;
import com.kaique.crudspring.enums.Category;
import com.kaique.crudspring.model.Course;

import java.util.List;
import java.util.stream.Collectors;

import com.kaique.crudspring.model.Lesson;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course) {

        if (course == null) {
            return null;
        }

        List <LessonDTO> lessons = course.getLessons()
        .stream() 
        .map(lesson -> new LessonDTO(lesson.getId(), lesson.getName(), lesson.getYoutubeUrl()))
        .collect(Collectors.toList());

        return new CourseDTO(course.getId(), course.getName(), "Front-End", lessons);
    }

    public Category convertCategoryValue(String value) {
        if (value == null) {
            return null;
        }
        return switch (value) {
            case "Front-end" -> Category.FRONT_END;
            case "Back-end" -> Category.BACK_END;
            default -> throw new IllegalArgumentException("Invalid Category.");
        };
    }


    public Course toEntity(CourseDTO courseDTO) {

        if (courseDTO == null) {
            return null;
        }

        Course course = new Course();
        if (courseDTO.id() != null) {
            course.setId(courseDTO.id());
        }

        List <Lesson> lessons = courseDTO.lessons().stream().map(lessonDTO -> {
            var lesson = new Lesson();
            lesson.setId(lessonDTO.id());
            lesson.setName(lessonDTO.name());
            lesson.setYoutubeUrl(lessonDTO.youtubeUrl());
            lesson.setCourse(course);
            return lesson;
        }).collect(Collectors.toList());
            course.setLessons(lessons);


        course.setName(courseDTO.name());
        course.setCategory(Category.FRONT_END);
        course.setStatus("Ativo");
        return course;
    }
}
