package com.kaique.crudspring.controller;

import com.kaique.crudspring.exception.RecordNotFoundException;
import com.kaique.crudspring.model.Course;
import com.kaique.crudspring.repository.CourseRepository;
import com.kaique.crudspring.service.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Validated
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService, CourseRepository courseRepository) {
        this.courseService = courseService;
    }

    @GetMapping
    public @ResponseBody List<Course> listCourses() {
        return courseService.listCourses();
    }

    @GetMapping("/{id}")
    public Optional<Course> findById(@PathVariable @NotNull @Positive Long id) {
        return courseService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCurse(@RequestBody @Valid Course course) {
        return (courseService.createCurse(course));
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable Long id, @RequestBody Course course) {
        return courseService.update(id, course);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        courseService.delete(id);
    }
}
