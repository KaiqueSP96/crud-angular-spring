package com.kaique.crudspring.controller;

import com.kaique.crudspring.model.Course;
import com.kaique.crudspring.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

    private CourseRepository courseRepository;
    @GetMapping
    public List<Course> listCouses () {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Course> findById (@PathVariable Long id) {
        return courseRepository.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCurse(@RequestBody Course course) {
        return (courseRepository.save(course));
    }



}
