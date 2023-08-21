package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "nakamas", path = "nakamas")
public interface NakamaRepository extends CrudRepository<Nakama, Long> {

}