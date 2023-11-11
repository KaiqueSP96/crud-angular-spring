package com.kaique.crudspring.service;

import com.kaique.crudspring.exception.RecordNotFoundException;
import com.kaique.crudspring.model.Course;
import com.kaique.crudspring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;
import java.util.Optional;

@Validated
@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> listCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> findById(@PathVariable @NotNull @Positive Long id) {
        return Optional.ofNullable(courseRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }

    public Course createCurse(@Valid Course course) {
        return (courseRepository.save(course));
    }

    public Course update(@NotNull @PathVariable Long id, @Valid Course course) {
        return courseRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(course.getName());
                    recordFound.setCategory(course.getCategory());
                    return courseRepository.save(recordFound);
                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable Long id) {
        courseRepository.delete(courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
