package com.kaique.crudspring.dto.mapper;

import com.kaique.crudspring.dto.CourseDTO;
import com.kaique.crudspring.enums.Category;
import com.kaique.crudspring.model.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course) {

        if (course == null) {
            return null;
        }

        return new CourseDTO(course.getId(), course.getName(), "Front-End");
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
