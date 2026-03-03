package co.edu.uniquindio.Taller_API.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "desarrolladoras")
public class Desarrolladora {

    @Id
    @GeneratedValue(strategy)
}
