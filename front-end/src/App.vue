<template>
    <div id="app">
        <div>
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-brand href="#">NavBar</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="/">Home</b-nav-item>
                        <b-nav-item to="/admin">Admin</b-nav-item>
                        <b-nav-item to="/booking">Booking</b-nav-item>
                        <b-nav-item to="/contact">Contact</b-nav-item>
                        <b-nav-item to="/gallery">Gallery</b-nav-item>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
    <router-view />

        </div>
    </div>
</template>