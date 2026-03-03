package co.edu.uniquindio.Taller_API.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "videojuegos")
public class Videojuego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false)
    private Double precio;

    @Column(nullable = false, unique = true)
    private String codigoRegistro;

    @Enumerated(EnumType.STRING)
    private Genero genero;

    @ManyToOne
    @JoinColumn(name = "desarrolladora_id", nullable = false)
    private Desarrolladora desarrolladora;

    @Column(updatable = false)
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaModificacion;

    @Transient
    private Double precioConIva;

    @PrePersist
    public void prePersist(){
        this.fechaCreacion = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        this.fechaModificacion = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getCodigoRegistro() {
        return codigoRegistro;
    }

    public void setCodigoRegistro(String codigoRegistro) {
        this.codigoRegistro = codigoRegistro;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public Desarrolladora getDesarrolladora() {
        return desarrolladora;
    }

    public void setDesarrolladora(Desarrolladora desarrolladora) {
        this.desarrolladora = desarrolladora;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(LocalDateTime fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public Double getPrecioConIva() {
        return precioConIva;
    }

    public void setPrecioConIva(Double precioConIva) {
        this.precioConIva = precioConIva;
    }
}
