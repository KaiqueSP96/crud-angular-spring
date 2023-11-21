package com.kaique.crudspring.dto.mapper;

import com.kaique.crudspring.dto.CourseDTO;
import com.kaique.crudspring.dto.LessonDTO;
import com.kaique.crudspring.enums.Category;
import com.kaique.crudspring.model.Course;

import java.util.List;
import java.util.stream.Collectors;

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

    public Course toEntity(CourseDTO courseDTO) {

        if (courseDTO == null) {
            return null;
        }

        Course course = new Course();
        if (courseDTO.id() != null) {
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        course.setCategory(Category.FRONT_END);
        course.setStatus("Ativo");
        return course;
    }
}
