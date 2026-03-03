package co.edu.uniquindio.Taller_API.service;

import co.edu.uniquindio.Taller_API.entity.Desarrolladora;
import co.edu.uniquindio.Taller_API.entity.Videojuego;
import co.edu.uniquindio.Taller_API.exception.ResourceNotFoundException;
import co.edu.uniquindio.Taller_API.repository.DesarrolladoraRepository;
import co.edu.uniquindio.Taller_API.repository.VideoJuegoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideojuegoService {

    private final VideoJuegoRepository videoJuegoRepository;
    private final DesarrolladoraRepository desarrolladoraRepository;

    public List<Videojuego> listarTodos() {
        List<Videojuego> lista = videoJuegoRepository.findAll();
        lista.forEach(this::calcularIva);
        return lista;
    }

    public Videojuego obtenerPorId(Long id) {
        Videojuego videojuego = videoJuegoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Videojuego no encontrado"));
        calcularIva(videojuego);
        return videojuego;
    }

    public List<Videojuego> buscarPorTitulo(String titulo) {
        if (titulo == null || titulo.isBlank()) {
            throw new ResourceNotFoundException("Titulo no encontrado");
        }
        List<Videojuego> lista = videoJuegoRepository.findByTituloContainingIgnoreCase(titulo);
        lista.forEach(this::calcularIva);
        return lista;
    }

    public List<Videojuego> buscarPorRango(Double min, Double max) {
        if (min == null || max == null) {
            throw new ResourceNotFoundException("Rango no encontrado");
        }
        if (min < 0 || max < 0) {
            throw new IllegalArgumentException("El precio no puede ser negativo");
        }
        if (min > max) {
            throw new IllegalArgumentException("El precio mínimo no puede ser mayor que el precio máximo");
        }

        List<Videojuego> lista = videoJuegoRepository.buscarPorRangoPrecio(min, max);
        lista.forEach(this::calcularIva);
        return lista;
    }

    public void eliminarPorId(Long id) {
        Videojuego videojuego = videoJuegoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Videojuego no encontrado"));
        videoJuegoRepository.delete(videojuego);
    }

    public Videojuego guardar(Videojuego videojuego) {

        if (videojuego.getPrecio() == null) {
            throw new RuntimeException("El precio es obligatorio");
        }

        if (videojuego.getDesarrolladora() != null) {
            Long id = videojuego.getDesarrolladora().getId();
            Desarrolladora desarrolladora = desarrolladoraRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Desarrolladora no encontrada"));
            videojuego.setDesarrolladora(desarrolladora);
        }

        return videoJuegoRepository.save(videojuego);
    }


        public Videojuego aplicarDescuento(Long id, double porcentaje){
        Videojuego videojuego = obtenerPorId(id);
        double nuevoPrecio = videojuego.getPrecio() - (videojuego.getPrecio() * porcentaje / 100);
        videojuego.setPrecio(nuevoPrecio);
        return videoJuegoRepository.save(videojuego);
    }

    private void calcularIva(Videojuego videojuego){
        Double precio = videojuego.getPrecio();
        if(precio == null){
            throw new RuntimeException("El videojuego con id " + videojuego.getId() + " no tiene precio definido");
        }
        videojuego.setPrecioConIva(precio * 1.19);
    }
}
