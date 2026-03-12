//
//  ContentView.swift
//  ShortsKiller
//
//  Created by Jacob Kelly on 3/12/26.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 20) {
            Image("AppLogo")
                .resizable()
                .scaledToFit()
                .frame(width: 120)

            Text("ShortsKiller")
                .font(.largeTitle)
                .fontWeight(.bold)

            Text("Hides YouTube Shorts content and redirects Shorts pages to the YouTube homepage in Safari.")
                .multilineTextAlignment(.center)

            VStack(alignment: .leading, spacing: 10) {
                Text("How to enable:")
                    .font(.headline)

                Text("1. Open Settings")
                Text("2. Go to Safari")
                Text("3. Tap Extensions")
                Text("4. Enable ShortsKiller")
                Text("5. Allow it on YouTube")
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
            .background(.thinMaterial)
            .cornerRadius(12)
        }
        .padding()
    }
}
