package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final PirataRepository repositoryI;
	private final NakamaRepository repositoryM;
	private final BandaRepository repositoryB;
	private final IntegranteRepository repositoryN;

	@Autowired
	public DatabaseLoader(
		PirataRepository repositoryI,
		NakamaRepository repositoryM,
		BandaRepository repositoryB,
		IntegranteRepository repositoryN
		) {
		this.repositoryI = repositoryI;
		this.repositoryM = repositoryM;
		this.repositoryB = repositoryB;
		this.repositoryN = repositoryN;
	}

	@Override
	public void run(String... strings) throws Exception {

		Pirata iVoz = new Pirata("Sanji", "Comandante", "Acude al recate de todas");
		Pirata iGuitarrElectrica = new Pirata("Robbin", "Arqueologa", "she is very cute");
		Pirata iBajo = new Pirata("Jimbe", "Timonel", "Sabe nadar");
		this.repositoryI.save(new Pirata("Luffy", "Capitán", "Futuro rey de los piratas"));
		this.repositoryI.save(new Pirata("Zoro","Vice Capitán","Mano derecha de Luffy"));
		this.repositoryI.save(new Pirata("Nami","Navegante","La que conduce"));
		this.repositoryI.save(new Pirata("Chopper", "Mascota", "Algodón de azúcar"));
		this.repositoryI.save(iVoz);
		this.repositoryI.save(iGuitarrElectrica);
		this.repositoryI.save(iBajo);

		Nakama mFreddie = new Nakama("Roger");
		Nakama mBrian = new Nakama("Ace");
		Nakama mRogerWaters = new Nakama("Torao");
		this.repositoryM.save(mFreddie);
		this.repositoryM.save(mBrian);
		this.repositoryM.save(mRogerWaters);
		this.repositoryM.save(new Nakama("Shanks"));

		Banda bQueen = new Banda("Piratas de Roger");
		Banda bPinkFloyd = new Banda("Piratas corazón");
		this.repositoryB.save(bQueen);
		this.repositoryB.save(bPinkFloyd);

		Integrante intFreddie = new Integrante(bQueen, mFreddie, iVoz);
		this.repositoryN.save(intFreddie);
		Integrante intBrian = new Integrante(bQueen, mBrian, iGuitarrElectrica);
		this.repositoryN.save(intBrian);
		Integrante intRogerWaters = new Integrante(bPinkFloyd, mRogerWaters, iBajo);
		this.repositoryN.save(intRogerWaters);


	}
}