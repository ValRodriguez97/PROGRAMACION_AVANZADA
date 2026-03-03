package co.edu.uniquindio.Taller_API.repository;

import co.edu.uniquindio.Taller_API.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoJuegoRepository extends JpaRepository<Videojuego, Long> {

    List<Videojuego> findByGenero(Genero genero);

    List<Videojuego> findByTituloContainingIgnoreCase(String titulo);

    @Query("SELECT v FROM Videojuego v WHERE v.precio BETWEEN :min AND :max")
    List<Videojuego> buscarPorRangoPrecio(
            @Param("min") Double min,
            @Param("max") Double max);

    @Query(value = "SELECT * FROM videojuegos ORDER BY fecha_creacion DESC LIMIT 5", nativeQuery = true)
    List<Videojuego> ultimos5();

}
