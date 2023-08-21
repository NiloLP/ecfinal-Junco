package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class Integrante {

	private @Id @GeneratedValue Long id;

	@ManyToOne()
	@JoinColumn(name = "id_banda")
	private Banda banda;

	@ManyToOne()
	@JoinColumn(name = "id_nakama")
	private Nakama nakama;

	@ManyToOne()
	@JoinColumn(name = "id_pirata")
	private Pirata pirata;

	public Integrante() {}

	public Integrante(Banda banda, Nakama nakama, Pirata pirata) {
		this.banda = banda;
		this.nakama = nakama;
		this.pirata = pirata;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    public Banda getBanda() {
        return banda;
    }

    public void setBanda(Banda banda) {
        this.banda = banda;
    }

    public Nakama getNakama() {
        return nakama;
    }

    public void seNakama(Nakama nakama) {
        this.nakama = nakama;
    }

    public Pirata getPirata() {
        return pirata;
    }

    public void setPirata(Pirata pirata) {
        this.pirata = pirata;
    }

}