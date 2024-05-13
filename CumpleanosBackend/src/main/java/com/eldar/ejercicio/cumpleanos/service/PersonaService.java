package com.eldar.ejercicio.cumpleanos.service;

import com.eldar.ejercicio.cumpleanos.entity.Persona;
import com.eldar.ejercicio.cumpleanos.repository.PersonaRepository;
import jakarta.validation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PersonaService {

    @Autowired
    PersonaRepository personaRepository;

    @Autowired
    Validator validator;

    public List<Persona> findAll(){
        return personaRepository.findByConfirmadoFalse();
    }

    public Persona findById(Integer id){
        return personaRepository.findById(id).get();
    }

    public Persona create(Persona p){
        Set<ConstraintViolation<Persona>> cv = validator.validate(p);
        if(cv.isEmpty())
            return personaRepository.save(p);
        else throw new ValidationException(cv.stream().map(v -> v.getMessage()).collect(Collectors.toList()).toString());
    }

    public Persona update(Persona p){
        if(personaRepository.existsById(p.getId())){
            Set<ConstraintViolation<Persona>> cv = validator.validate(p);
            if(cv.isEmpty())
                return personaRepository.save(p);
            else throw new ValidationException(cv.stream().map(v -> v.getMessage()).collect(Collectors.toList()).toString());
        }
        throw new NoSuchElementException();
    }

    public List<Persona> updateMany(List<Persona> p){
        for(Persona per : p){
            if(!personaRepository.existsById(per.getId()))
                throw new NoSuchElementException();
        }
        return personaRepository.saveAll(p);
    }

    public void delete(Integer id){
        if(personaRepository.existsById(id)){
            personaRepository.deleteById(id);
        } else
        throw new NoSuchElementException();
    }

}
